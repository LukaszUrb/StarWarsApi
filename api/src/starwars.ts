import { Forbidden } from "./errors";
import { ISerializedPerson, swApiPerson } from "./services";
import { asArray } from "./utils";

export const fetchMyCharacter = async (id: number): Promise<ISerializedPerson> => (await swApiPerson.getEntities(id))[0];

export const verifySWApiAccess = (id: number, entityIds: number | number[]): void => {
    if (!(asArray(entityIds)).includes(id)) throw new Forbidden("Your character does not have rights to view this entity.");
};