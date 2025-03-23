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
