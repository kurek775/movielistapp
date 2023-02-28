import mongoose from 'mongoose'

const Schema = mongoose.Schema;
 // const ObjectId = Schema.Types.ObjectId;

const FilmListSchema = new Schema({
   name: String,
   owner: Number,
   movies: Array,
   thread: Array
});

const FilmListModel = mongoose.model('Filmlist', FilmListSchema);

export default FilmListModel;