import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export default async function getConnection() {
  return await oracledb.getConnection({
    user: "SYSTEM",
    password: "qwerty",
    connectString: "localhost:1521/XEPDB1",
  });
}
const connection = await getConnection();
console.log("Connected to Oracle Database");
const sql = `SELECT * FROM attendance`;
const result = await connection.execute(sql);
console.log(result.rows); // Output the result rows