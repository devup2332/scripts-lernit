import { clients } from "../config/clients";
import graphqlClientLernit from "../graphql/client";
import { GET_INFO_COURSES_MP_PER_CLIENT } from "../graphql/queries/courses/getInfoCoursesMpPerClient";
import { GET_INFO_COURSES_PER_CLIENT } from "../graphql/queries/courses/getInfoCoursesPerClient";
import type { ICourse, ICourseMarketplaceDataTP } from "../interfaces/course";
import xlsx from "xlsx";

export const generateExcelReportCoursesPerClient = async (clientId: string) => {
  console.log(`=====> Fetching Dadata for ${clientId}.`);
  const { courses } = await graphqlClientLernit.request<
    Promise<{ courses: ICourse[] }>
  >(GET_INFO_COURSES_PER_CLIENT, {
    clientId,
  });

  const { coursesMP } = await graphqlClientLernit.request<
    Promise<{ coursesMP: ICourseMarketplaceDataTP[] }>
  >(GET_INFO_COURSES_MP_PER_CLIENT, {
    clientId,
  });

  // Creating Excel File
  console.log(`=====> Writting Excel file for ${clientId}.`);
  const wb = xlsx.utils.book_new();
  const clientCourses = courses.map((c) => ({
    Id: c.id,
    Nombre: c.name,
    Tipo: c.type,
  }));
  const MPCourses = coursesMP.map((c) => ({
    Id: c.course.id,
    Nombre: c.course.name,
    Tipo: c.course.type,
  }));

  const sheet1 = xlsx.utils.json_to_sheet(clientCourses);
  const sheet2 = xlsx.utils.json_to_sheet(MPCourses);
  const sheetName1 = `Cursos ${clientId}`;
  const sheetName2 = `Cursos mp ${clientId}`;
  const filename = `Cursos ${clientId}.xlsx`;
  xlsx.utils.book_append_sheet(wb, sheet1, sheetName1);
  xlsx.utils.book_append_sheet(wb, sheet2, sheetName2);
  xlsx.writeFile(wb, filename);
  console.log(`!!!!!! Ready.`);
};
