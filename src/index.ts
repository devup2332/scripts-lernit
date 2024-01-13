import { clients } from "./config/clients";
import { generateExcelReportCoursesPerClient } from "./reportsExcel/getCoursesPerClient";
import { syncCoursesByExcel } from "./scripts/syncCoursesByExcel";

// Scripts
syncCoursesByExcel(clients.EXECON.id);

// Reports Excel
// generateExcelReportCoursesPerClient(clients.EXECON.id);
