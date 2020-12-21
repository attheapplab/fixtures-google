/**
 * Concatenates the input values into an SQL insert statement.
 *
 * @param {Object} input The range containing the values to insert.
 * @return The SQL-compliant concatenated insert statement.
 * @customfunction
 */
function FIXTURE(input) {
  const table = input[0][0]
  const headers = input[1].filter(name => name)
  const types = input[2].filter(type => type)
  const joinedHeaders = headers.join(", ")
  const rows = input.map(values => {
    values.shift()
    const joinedValues = values
    .map((value, index) => {
      let v = value
      if (types[index] == "text") {
        v = "'" + value + "'"
      }
      return v
    })
    .join(", ")
    const row = "INSERT INTO " + table + " (" + joinedHeaders + ") VALUES (" + joinedValues + ");"
    return row
  })
  return rows
}