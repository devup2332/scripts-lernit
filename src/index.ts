import { clients } from "./config/clients";
import { generateExcelReportCoursesPerClient } from "./reportsExcel/getCoursesPerClient";
import { syncCoursesByExcel } from "./scripts/syncCoursesByExcel";

// Scripts
// syncCoursesByExcel(clients.EXECON);

// Reports Excel
generateExcelReportCoursesPerClient(clients.EXECON.id);
