import type {Pool} from "pg";
import type {DAOs} from "../models/DAOs.ts";
import UserService from "./UserService.ts";
import GameService from "./GameService.ts";
import BoardService from "./BoardService.ts";

class Service {
    users: UserService;
    boards: BoardService;
    game: GameService;
    pool: Pool;

    private static instance: Service;

    constructor(daos: DAOs, pool: Pool) {
        this.pool = pool;
        this.users = new UserService(daos, pool);
        this.boards = new BoardService(daos, pool);
        this.game = new GameService(daos, pool);
    }

    public static async init(DAOs: DAOs, pool: Pool) {
        if (this.instance) {
            throw new Error("Services already initialized");
        }
        this.instance = new Service(DAOs, pool);
    }

    public static getInstance() {
        if (!this.instance) {
            throw new Error("Services not initialized");
        }
        return this.instance;
    }
}

export default Service;