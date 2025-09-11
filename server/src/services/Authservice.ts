import { getRepository } from "../config/data-source";
import { User } from "../models/User";

export default class {
    private userRepoistory = getRepository(User);
}