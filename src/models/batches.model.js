// batches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const studentSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    evaluation: [evaluationSchema]
  });

  const evaluationSchema = new Schema({
    color: { type: Boolean, default: undefined },
    remark: { type: String },
    day: { type: Date, required: true }
  });

  const batchesSchema = new Schema({
    number: { type: Number, required: true },
    starts: { type: Date, required: true },
    ends: { type: Date, required: true },
    students: [studentSchema],
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('batches', batches);
};
