import { HomeView } from "@/views/home";

const STUDIO_TEST_DATA = {
  
  name: 'Екатерина Петровна',
  profession: 'Стилист-парикмахер',
  logo: 'https://gallery.alexandersakulin.com/storage/app/uploads/public/8e8/943/e0a/thumb__0_800_0_0_auto.jpg',
  id: 1,
  rating: {
    reviewsCount: 20,
    rating: 20,
  }

}

export default function Home() {

  return (

    <>

      <HomeView studioInfo = { STUDIO_TEST_DATA } />

    </>

  );

}
