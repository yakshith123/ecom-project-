import app from "./app.js";
import { pool } from "./utils/db.js";
const PORT = process.env.PORT || 4000;
pool.connect()
    .then(() => {
    console.log("Connected to PostgreSQL");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error("Failed to connect to PostgreSQL", err);
    process.exit(1);
});
