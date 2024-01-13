import graphqlClientLernit from "../graphql/client";
import { GET_COMPENTENCIES_PER_INSTANCE } from "../graphql/queries/getCompetenciesPerInstance";
import type { ICompetencie } from "../interfaces/competencies";
import xlsx from "xlsx";
import type { ICourseExcelToUpdateCompetencies } from "../interfaces/excelDocuments/courseExcel";
import { GET_INFO_COURSES_BY_IDS } from "../graphql/queries/courses/gitInfoCoursesByExcel";
import type { ICourse } from "../interfaces/course";
import { getLevelsPerInstance } from "../utils/getLevelsPerInstance";
import type { ILevelVoldemort } from "../interfaces/levelVoldemort";
import { sleep } from "bun";

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
  const levelsInstance = (await getLevelsPerInstance(clientId)) || [];

  for (const MPCourse of MPCourses) {
    const cExcel = coursesExcel.filter(
      (cExcel) => cExcel["Curso ID"] === MPCourse.id
    );
    let competencies = [];
    if (cExcel.length === 1)
      competencies.push({
        competencie: cExcel[0].Competencias,
        level: cExcel[0].Nivel,
      });
    if (cExcel.length > 1) {
      cExcel.forEach((c) =>
        competencies.push({
          competencie: c.Competencias,
          level: c.Nivel,
        })
      );
    }
    const compWithLevels = [];
    // console.log({ competencies });

    for (const comp of competencies) {
      const fC = competenciesLXP.find((c) => c.name === comp.competencie);
      const lvl = levelsInstance.find((lvl) =>
        lvl.name
          .trim()
          .toLowerCase()
          .includes(comp.level.trim().toLocaleLowerCase())
      );
      if (!fC || !lvl) {
        console.log(`===> NOT FOUND ${cExcel}`, { comp });
        continue;
      }
      compWithLevels.push({
        levels: [
          {
            id: lvl.id,
            name: lvl.name,
          },
        ],
        competencieId: fC.competencieId,
        competencieName: fC.name,
      });
      // console.log({ compWithLevels });
    }
    // await sleep(10000);
  }
};
