import express, { json } from "express";

export const app = express();

app.use(json());