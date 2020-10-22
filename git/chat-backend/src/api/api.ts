import { Application, Router } from "express";
import { Sequelize } from "sequelize";

export abstract class Api {
  protected abstract async initialize();
  abstract async routing(app?: Application): Promise<Router>;

  constructor(protected _sequielize: Sequelize) {
    this.initialize();
  }
}
