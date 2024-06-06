const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],


  });
  
  const Subject = mongoose.model('Subject', subjectSchema);
  