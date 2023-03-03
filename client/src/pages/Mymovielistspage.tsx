import CreateMovielist from "../components/CreateMovielist";
import MyMovielists from "../components/MyMovielists";
interface MymovielistspageProps {
    
}
 
const Mymovielistspage: React.FC<MymovielistspageProps> = () => {
    return (<>
     <CreateMovielist></CreateMovielist>
     <MyMovielists viewmode={true} movieId={0} movieName={""} moviePoster={""} movieURL={""}></MyMovielists>
    </>  );
}
 
export default Mymovielistspage;