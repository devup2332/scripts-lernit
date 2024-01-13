import { environments } from "../config/enviroments";
import type { ILevelVoldemort } from "../interfaces/levelVoldemort";

export const getLevelsPerInstance = async (instance: string) => {
  try {
    const response = await fetch(
      `${environments.VOLDEMORT_API}/lxp/levels/${instance}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${environments.TOKEN_VOLDEMORT}`,
        },
      }
    );
    return (await response.json()).data as ILevelVoldemort[];
  } catch (err) {
    return [];
  }
};
