module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      notes: String,
      best_moment: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Dairy = mongoose.model("dairy", schema);
  return Dairy;
};
