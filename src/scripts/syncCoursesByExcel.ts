import graphqlClientLernit from "../graphql/client";
import { GET_COMPENTENCIES_PER_INSTANCE } from "../graphql/queries/getCompetenciesPerInstance";
import type { ICompetencie } from "../interfaces/competencies";
import xlsx from "xlsx";
import type { ICourseExcelToUpdateCompetencies } from "../interfaces/excelDocuments/courseExcel";
import { GET_INFO_COURSES_BY_IDS } from "../graphql/queries/courses/gitInfoCoursesByExcel";
import type { ICourse } from "../interfaces/course";
import { getLevelsPerInstance } from "../utils/getLevelsPerInstance";
import type { ILevelVoldemort } from "../interfaces/levelVoldemort";

export const syncCoursesByExcel = async (clientId: string) => {
  console.log(`===> Reading Excel ...`);
  const wbData = xlsx.readFile("data.xlsx");
  const coursesExcel: ICourseExcelToUpdateCompetencies[] =
    xlsx.utils.sheet_to_json(wbData.Sheets["Cursos"]);
  const coursesWithIds = coursesExcel.filter((c) => c["Curso ID"]);
  const coursesWithNames = coursesExcel.filter(
    (c) => c["Nombre del curso"] && !c["Curso ID"]
  );

  console.log(`===> Total Data : ${coursesExcel.length}`);
  console.log(`===> Courses with Ids : ${coursesWithIds.length}`);
  console.log(`===> Courses with names : ${coursesWithNames.length} \n`);

  const coursesIds = coursesExcel.map((c) => c["Curso ID"]).filter(Boolean);

  console.log(`===> Getting courses info ...`);
  const { coursesLXP } = await graphqlClientLernit.request<
    Promise<{ coursesLXP: ICourse[] }>
  >(GET_INFO_COURSES_BY_IDS, {
    coursesIds,
  });

  console.log(`===> Getting competencies info ...`);
  const { competenciesLXP } = await graphqlClientLernit.request<
    Promise<{ competenciesLXP: ICompetencie[] }>
  >(GET_COMPENTENCIES_PER_INSTANCE, {
    clientId,
  });

  const MPCourses = coursesLXP.filter((c) => c.clientId === "content");
  const ClientCourses = coursesLXP.filter((c) => c.clientId === clientId);
  console.log(`\n===> Client courses : ${ClientCourses.length}`);
  console.log(`===> MP courses : ${MPCourses.length}`);

  // Updating MPCourses

  console.log(`===> Updating MP Courses ...`);
  const levels = await getLevelsPerInstance(clientId);

  for (const MPCourse of MPCourses) {
    const cExcel = coursesExcel.filter(
      (cExcel) => cExcel["Curso ID"] === MPCourse.id
    );
    let competencies = [];
    if (cExcel.length === 1) competencies.push(cExcel[0].Competencias);
    if (cExcel.length > 1) {
      cExcel.forEach((c) => competencies.push(c.Competencias));
    }

    for (const comp of competencies) {
      const fC = competenciesLXP.find(
        (c) =>
          c.name.trim().toLocaleLowerCase() === comp.trim().toLocaleLowerCase()
      );
      if (!fC) continue;
    }
  }
};
