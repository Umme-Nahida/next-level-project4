import { useCreateBookMutation } from "@/features/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddBookForm = () => {
  const [createBook, { data, isError }] = useCreateBookMutation()
  const navigate = useNavigate();
  console.log('createBook Data', data)
  console.log('create book err', isError)
 
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const isbn = form.isbn.value;
    const description = form.description.value;
    const copies = parseInt(form.copies.value);
    const available = form.available.checked;

    const newBook = { title, author, genre, isbn, description, copies, available };
   

    const res = await createBook(newBook);
    console.log('createBook res', res);

    if (res.data?.success) {
       toast.success("Book added successfully!");
      navigate('/books')
      
    } else if (res.data.error) {
      const {errors} = res.data.error;
      toast.error(errors.errorResponse?.errmsg)
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Book</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Genre Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select
              name="genre"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select Genre</option>
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              placeholder="Enter ISBN number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Write a brief description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copies</label>
            <input
              type="number"
              name="copies"
              min="1"
              placeholder="Number of copies"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              id="available"
              name="available"
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              defaultChecked
            />
            <label htmlFor="available" className="text-gray-700 font-medium">Available</label>
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default AddBookForm;
