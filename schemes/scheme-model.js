const db = require("../data/dbConfig");

async function find() {
  return await db("schemes");
}

async function findById(id) {
  return (
    (await db("schemes")
      .where({ id })
      .first()) || null
  );
}

async function findSteps(id) {
    return await db("schemes")
    .join("steps", "steps.scheme_id", "schemes.id")
    .select(
        "steps.id",
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions"
    )
    .where("schemes.id", id)
}

async function add(scheme) {
    const id = await db("schemes").insert(scheme, "id");
    return findById(...id);
}

async function update(changes, id) {
    await db("schemes")
    .where({ id })
    .update(changes);
    return findById(id);
}

async function remove(id) {
    const delScheme = await findById(id);
    const del_ = await db("schemes")
    .where({ id })
    .del();
    return del_ ? delScheme : null;
}

// Stretch
// async function addStep() {}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};
