import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image = import.meta.env.VITE_IMAGE_API_KEY;
const imageApi = `https://api.imgbb.com/1/upload?key=${image}`
const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm()
    const onSubmit = async(data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(imageApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

    }

    return (
        <div>
            <SectionTitle subHeading={'Whats New?'} heading={'add an item'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            {...register('name', {required: true})}
                            type="text" placeholder="Enter Recipe Name" className="input input-bordered w-full " />
                    </div>

                    <div className='flex justify-between gap-5'>
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue='default' {...register("category", {required: true})} className="select select-bordered w-full ">
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                {...register('price', {required: true})}
                                type="number" placeholder="Price" className="input input-bordered w-full " />
                        </div>

                    </div>

                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe</span>
                        </div>
                        <textarea {...register('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Recipe"></textarea>
                    </label>

                    <div className='form-control w-full my-6'>
                        <input type="file" {...register('image', {required: true})} className="file-input file-input-bordered w-full max-w-xs" />
                    </div>

                    <button className='btn btn-outline btn-success'>
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;