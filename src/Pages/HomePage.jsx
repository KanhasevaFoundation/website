import { Helmet } from 'react-helmet-async';
import HeroSection from '../component/HeroSection';
import CTASection from '../component/CTASection';
import DonateSection from '../component/DonateSection';
import ImageSlider from '../component/ImageSlider';
import CounterSection from '../component/CounterSection';
import VolunteerSection from '../component/VolunteerSection';
import SocialSection from '../component/SocialSection';
import Gallery from './Gallery';

function HomePage() {
    return (
        <div className='bg-sky-50 '>
            <Helmet>
              <title>Kanhaseva – Feed Cows, Help the Poor</title>
              <meta name="description" content="Join us to feed cows and support underprivileged communities with meals, clothing, and essentials." />
              <link rel="canonical" href="https://kanhasevain.vercel.app/" />
              <meta property="og:title" content="Kanhaseva – Feed Cows, Help the Poor" />
              <meta property="og:description" content="Join us to feed cows and support underprivileged communities." />
              <meta property="og:url" content="https://kanhasevain.vercel.app/" />
              <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <HeroSection />
            <CTASection />
            <DonateSection />
            <Gallery />
            <CounterSection />
            <VolunteerSection />
            <SocialSection />
        </div>
    );
}

export default HomePage;
