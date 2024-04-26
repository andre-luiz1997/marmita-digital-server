import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_PROVIDER, DB_USER } from "@/constants";
import mongoose from "mongoose";

function getURI () {
  const user = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
  return `mongodb://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

export const databaseProviders = [{
  provide: DB_PROVIDER,
  useFactory: async (): Promise<typeof mongoose> => mongoose.connect(getURI())
}]