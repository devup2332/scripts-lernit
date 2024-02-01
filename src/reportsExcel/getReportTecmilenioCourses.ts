import graphqlClientLernit from "../graphql/client";
import { GET_INFO_COURSES_TECMILENIO } from "../graphql/queries/courses/getInfoCoursesTecmilenio";
import type { ICourse } from "../interfaces/course";
import xlsx from "xlsx";

export const getReportTecmilenioCourses = async () => {
  console.log(`====>Getting info of tecmilenio courses`);
  const { courses } = await graphqlClientLernit.request<
    Promise<{ courses: ICourse[] }>
  >(GET_INFO_COURSES_TECMILENIO);
  console.log({ courses: courses.length });
  const wb = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(
    courses.map((c) => ({ Nombre: c.name, "Curso ID": c.id, Tipo: c.type })),
  );
  console.log(`====>Writing Excel`);
  xlsx.utils.book_append_sheet(wb, sheet, "Cursos");
  xlsx.writeFile(wb, "cursosTecmilenio.xlsx");
  console.log(`!!!!!Done`);
};
