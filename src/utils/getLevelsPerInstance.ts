import { environments } from "../config/enviroments";
import type { ILevelVoldemort } from "../interfaces/levelVoldemort";

export const getLevelsPerInstance = async (instance: string) => {
  try {
    const response = await fetch(
      `${environments.VOLDEMORT_API}/lxp/levels/${instance}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${environments.TOKENVOL_DEMORT}`,
        },
      }
    );
    return (await response.json()) as ILevelVoldemort[];
  } catch (err) {
    return;
  }
};
