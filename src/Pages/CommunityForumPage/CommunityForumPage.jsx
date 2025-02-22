import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useForum from '../../Hooks/useForum';

const CommunityForumPage = () => {
    const { forums } = useForum()

    return (
        <div className="p-6">
            <Helmet>
                <title>MH Fitness Center | Community Forums</title>
            </Helmet>
            <div className='text-center'>
                <SectionTitle
                    firstTitle={'Community'}
                    secondTitle={'Forums'}
                />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    forums.map(item => <div
                        key={item._id}
                        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        <figure>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="aspect-video w-full"
                            />
                        </figure>
                        <div className="p-6">
                            <h3 className="text-lg md:text-3xl mb-2  font-medium text-slate-700">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-400"> {item.content.slice(0, 150)}.....</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CommunityForumPage;