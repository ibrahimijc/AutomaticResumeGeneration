import Image from 'next/image';
import Link from 'next/link';

function FeatureSection() {
  return (
    <>
      <FeatureCard>
        <CardPinnnedIcon>
          <Image src="/icons/style.svg" alt="style" height="56" width="56" />
        </CardPinnnedIcon>
        <p className="text-xl mr-14">
          Create Single Page <strong>Fascinating Resume</strong>!
        </p>
      </FeatureCard>

      <FeatureCard>
        <CardPinnnedIcon>
          <Image src="/icons/speed.svg" alt="speed" height="56" width="56" />
        </CardPinnnedIcon>
        <p className="text-xl mr-14">
          Just Enter <strong>Job Description</strong> and Quick Apply!
        </p>
      </FeatureCard>

      <FeatureCard>
        <CardPinnnedIcon>
          <Image src="/icons/magic.svg" alt="magic" height="56" width="56" />
        </CardPinnnedIcon>
        <p className="text-xl mr-14">
          Utilize <strong>AI </strong>to Customize Resume For You!
        </p>
      </FeatureCard>

      <FeatureCard>
        <CardPinnnedIcon>
          <Image src="/icons/lock.svg" alt="lock" height="56" width="56" />
        </CardPinnnedIcon>
        <p className="text-xl mr-14">
          Access <strong>your</strong> data from anywhere!
        </p>
      </FeatureCard>
    </>
  );
}

const FeatureCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`transition ease-in-out delay-100 duration-300 bg-resume-100 hover:bg-resume-500 text-resume-800
      hover:text-resume-50 fill-resume-800 px-6 py-10 lg:p-12 flex shadow-md cursor-pointer relative rounded-xl h-full`}
    >
      <Link href="/login" passHref={true}>
        {children}
      </Link>
    </div>
  );
};

const CardPinnnedIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur-2xl bg-resume-100 rounded-full p-2 shadow-level-hard absolute right-0 top-0 -mt-4 -mr-1">
      {children}
    </div>
  );
};

export default FeatureSection;
