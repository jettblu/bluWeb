import EnterSlideSide from "../../../components/animations/EnterSlideSide";
import EnterSlideUp from "../../../components/animations/EnterSlideUp";
import BluVideo from "../../../components/film/bluVideo";
import ImageWithBlur from "../../../components/images/ImageWithBlur";

export default async function Summer23() {
  return (
    <div className="max-h-[92vh] overflow-auto text-white snap-mandatory snap-y w-[100vw] -mx-4">
      {/* top photo */}
      <div className="bg-neutral-700 w-full h-[94vh] snap-center place-content-center flex flex-col items-center px-2">
        <EnterSlideUp>
          <Polaroid
            src="/adventures/summer23/fireByNightLake.jpg"
            caption="Summer 23'"
          />
        </EnterSlideUp>
      </div>
      <hr className="" />
      {/* intro */}
      <div className="h-[92vh] bg-stone-700 snap-center relative place-content-center flex flex-col items-center px-2">
        <div className="prose prose-invert md:prose-xl">
          <p>
            Life should be lived with lots of color. Especially summer. Not the
            color you see. But the color you feel. Did you feel the power of{" "}
            <span className="text-sky-500">ocean blue</span>? Did you feel the
            calm of <span className="text-green-600">forest green</span>? Did
            you feel the warmth of{" "}
            <span className="text-yellow-700">brown sand</span>?{" "}
          </p>
          <p>Did you feel the color of life?</p>
          <p className="bluFont text-3xl">- Jett September 2023</p>
        </div>
        <div className="absolute bottom-0 w-full grid grid-cols-3 md:grid-cols-6 mt-8">
          <div className="bg-sky-400 h-6 md:h-20 w-full "></div>
          <div className="bg-emerald-400 h-6 md:h-20 w-full "></div>
          <div className="bg-fuchsia-400 h-6 md:h-20 w-full "></div>
          <div className="bg-rose-400 h-6 md:h-20 w-full "></div>
          <div className="bg-amber-400 h-6 md:h-20 w-full "></div>
          <div className="bg-violet-400 h-6 md:h-20 w-full "></div>
        </div>
      </div>
      {/* last pgh run */}
      <div className="bg-green-900 w-full h-[96vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="May 7th" location="Frick Park" />
        <Polaroid
          src="/adventures/summer23/lastBurghRunOfSpring.jpeg"
          caption="Last Run in Pgh"
        />
      </div>
      <hr className="" />
      {/* cmu bball */}
      <div className="bg-orange-800 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="May 8th" location="Carnegie Mellon" />
        <div className="flex flex-col space-y-2 md:flex-row w-full">
          <div className="md:w-1/2">
            <EnterSlideSide>
              <Polaroid
                src="/adventures/summer23/bballWithRohan.jpeg"
                caption="Bball with Rohan"
              />
            </EnterSlideSide>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I finish my final exam around noon. Rohan is taking me to the
              airport, but first, we play one last game of basketball.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* jordan ward concert */}
      <div className="bg-violet-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="May 13th" location="Los Angeles, CA" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <EnterSlideUp>
              <Polaroid
                src="/adventures/summer23/jordanWardLights.jpg"
                caption="Jordan Ward Concert"
              />
            </EnterSlideUp>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Keala and I go to a concert in downtown Los Angeles. This is our
              first big excursion together, since breaking up in March. Music
              heals.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* half ironman */}
      <div className="bg-gradient-to-r from-stone-900 to-emerald-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="May 20th" location="Morro Bay, CA" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <div className="max-w-lg mx-auto">
              <BluVideo
                videoSrc="https://youtu.be/kpTECmnslmw"
                isPlaying={false}
              />
            </div>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Every year, I go on an adventure for my birthday. This year, I
              decide to do my first half Ironman.
            </p>
          </div>
        </div>
      </div>
      {/* bday */}
      <div className="bg-yellow-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="May 8th" location="Torrance Beach" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/bdaySwim.jpg"
              caption="Birthday Buoy"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I turn twenty one! Alex and I begin the day, with a frigid swim to
              my favorite buoy in the whole wide world.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* disneyland */}
      <div className="bg-blue-900 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="May 26th" location="Disneyland" />
        <Polaroid
          src="/adventures/summer23/disneylandForeverView.jpg"
          caption="Disneyland With Keala"
        />
      </div>
      <hr className="" />
      {/* utah move */}
      <div className="bg-stone-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="May 27th" location="Mapleton, Utah" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <div className="max-w-lg mx-auto">
              <BluVideo
                videoSrc="https://youtu.be/oQ6PPxZV5fE?si=NLBModKm7ieEUfGf"
                isPlaying={false}
              />
            </div>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Keala moves to Utah and begins her cowgirl adventure. We drive all
              day from the California coast to the Provo mountains. For Keala,
              it’s a one-way journey to her new life as a horse trail guide.
            </p>
            <p>
              We roller skate (my first time!) and stumble across a pride parade
              in Salt Lake City. Utah is so green, and the early summer moon
              hangs low over the mountains.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Strand with Alex */}
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-500 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="June 12th" location="Torrance Beach" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/strandWithAlex.jpg"
              caption="Strand With Alex"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I run with Alex for the first time. We chug down the sunny strand
              before I jump into the ocean.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* grant returns from france*/}
      <div className="bg-slate-400 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="June 13th" location="Hermosa Beach" />
        <Polaroid
          src="/adventures/summer23/grantReturnsFromFrance.jpg"
          caption="Grant returns from France"
        />
      </div>
      <hr className="" />
      {/* Utah Mountain */}
      <div className="bg-green-900 w-full min-h-[92vh] snap-start pt-[22vh] pt-[22vh] px-2 relative">
        <DateAndLocation date="June 27th" location="Spanish Fork Peak, Utah" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/mountainOverlook.jpg"
              caption="Wow"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Alex, Keala, and I climb Spanish Fork Peak. We hike through the
              river and snow before camping aside an alpine lake. We freeze
              without sleeping bags but light a pre-dawn fire for warmth.
              <p>
                An avalanche had cleared the trail, so the going was rough, but
                we made it, and I’m glad we did. The summit plateau is one of
                the most beautiful areas I have been to.{" "}
              </p>
              <p>I wear sandals all the way up.</p>
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/*reservoir*/}
      <div className="bg-gradient-to-r from-amber-600 via-green-200 to-sky-300 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="June 28th" location="Mapleton Reservoir" />
        <Polaroid
          src="/adventures/summer23/resWithOar.jpeg"
          caption="The Res'"
        />
      </div>
      <hr className="" />
      {/*july 4th*/}
      <div className="bg-red-700 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 4th" location="Provo, Utah" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/fourthOfJulyProvo.jpg"
              caption="Howdy Lady Liberty"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I'm on the way to South Dakota, but first, I stop in Provo for a
              lady liberty lovin' fourth of July Parade. He's standing. On two
              horses. At the same time!
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* biking the woods */}
      <div className="bg-gradient-to-r from-green-500 to-yellow-400 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="May 7th" location="Black Hills" />
        <Polaroid
          src="/adventures/summer23/sdBikeinGrass.jpg"
          caption="Hello South Dakota!"
        />
      </div>
      {/* Chompers with Aiti */}
      <div className="bg-blue-400 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 7th" location="Black Hills" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/weedSd.jpg"
              caption="Chompin' With Aiti"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Weeds are no match for wisdom and youth! Aiti and I are a daring,
              dynamic, and dashing duo.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* half marathon */}
      <div className="bg-orange-700 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 8th" location="Spearfish Canyon" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/halfMarathonSd.jpg"
              caption="13.1 Miles"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I run a half marathon down Spearfish canyon. I complete the race
              in 1:40:16, a personal best.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Whiffle Ball */}
      <div className="bg-green-800 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 12th" location="Black Hills" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/ballinSd.png"
              caption="Pasture Ball"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Whiffle ball with Grant and the deer. We rig a backstop with an
              ATV, rusty rhubarb, an old tarp, and some rope.
            </p>
            <p>Yankee Stadium can't beat this.</p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/*trunk sleep*/}
      <div className="bg-neutral-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 15th" location="Mapleton, Utah" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/trunkRoadtrip.jpg"
              caption="Goodnight"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>Grant settles in for the night after ten hours of driving.</p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Thermometer */}
      <div className="bg-gradient-to-r from-red-600 via-amber-500 to-orange-700 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="July 16th" location="Baker, California" />
        <Polaroid
          src="/adventures/summer23/thermometerBaker.jpg"
          caption="118 Degrees"
        />
      </div>
      <hr className="" />
      {/* Golf Catalina */}
      <div className="bg-gradient-to-r from-pink-500 via-green-500 to-indigo-500 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="July 17th" location="Catalina Island" />
        <Polaroid
          src="/adventures/summer23/golfCatalina.jpg"
          caption="Saw the Hole Island "
        />
      </div>
      <hr className="" />
      <div className="bg-slate-700 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="July 20th" location="Downtown Torrance" />
        <Polaroid
          src="/adventures/summer23/pieChamp.png"
          caption="Pie Eating Champ"
        />
      </div>
      <hr className="" />
      <div className="bg-teal-600 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="July 22nd" location="Home" />
        <Polaroid
          src="/adventures/summer23/grantTurns24Partay.png"
          caption="Grant's 24th Bday Partay"
        />
      </div>
      <hr className="" />
      {/* bike parents */}
      <div className="bg-gradient-to-r from-gray-500 via-pink-500 to-amber-500 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="July 23rd" location="Torrance Blvd" />
        <Polaroid
          src="/adventures/summer23/bikeParents.jpg"
          caption="Biking con Padres"
        />
      </div>
      <hr className="" />
      {/* Haircut Anaheim*/}
      <div className="bg-neutral-400 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="July 26th" location="Anaheim" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/haircutAnaheim.jpg"
              caption="Haircut"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              My last haircut was in Belize. It shows. Somehow, we finagle the
              premium deal (for free): massage, wash, and everything.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Barbie */}
      <div className="bg-pink-500 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="Auguest 2nd" location="Barbie World" />
        <Polaroid src="/adventures/summer23/barbie.jpg" caption="Hi Barbie" />
      </div>
      <hr className="" />
      {/* fence climb*/}
      <div className="bg-gradient-to-r from-gray-500 to-yellow-600 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="Auguest 8th" location="Torrance High School" />
        <Polaroid
          src="/adventures/summer23/fenceFrame.jpg"
          caption="Going Places"
        />
      </div>
      <hr className="" />
      {/* utah move */}
      <div className="bg-gradient-to-r from-sky-800 to-green-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 9th" location="Palos Verdes" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <div className="max-w-lg mx-auto">
              <BluVideo
                videoSrc="https://youtu.be/D54u23cE_ew?si=qytwoxvtJ_pKSsj4"
                isPlaying={false}
              />
            </div>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              We get lost below the cliffs and stumble across a slithering
              rattlesnake. Hot and dirty, we jump off sharp rocks into the
              refreshing Pacific. Ah, what a summer day.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/*mile with Gil*/}
      <div className="bg-orange-800 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 15th" location="Zamperini Stadium" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/fistBump.jpg"
              caption="My Fastest Mile"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Gil paces me around Zamp; I finish in{" "}
              <a
                href="https://www.strava.com/activities/9655622055"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:cursor-pointer text-sky-500"
              >
                5:36
              </a>
              , six seconds behind my goal, but faster than I've ever ran the
              mile.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Calm before the storm*/}
      <div className="bg-gradient-to-r from-purple-700 via-pink-400 to-blue-400 from-10% via-20% to-60% w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 19th" location="Torrance Beach" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/swimStorm.jpg"
              caption="Calm Before the Storm"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Jake and I swim to the buoy the night before Hurricane Hillary.
              The water is as calm as I've ever seen it. Like a lake.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Hurricane Ball*/}
      <div className="bg-neutral-400 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 20th" location="Home" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/hurricaneBall.jpeg"
              caption="Hurricane Who"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              My last day in California. Hurricane Hillary is storming, but Evan
              and I play a ferocious game of whiffle ball anyways.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Cabo Surfing*/}
      <div className="bg-amber-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 23rd" location="Cabo, Mexico" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <Polaroid
              src="/adventures/summer23/surfCabo.jpeg"
              caption="Breakers"
            />
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              Cabo, coding, and catching waves. I go on an all expenses paid
              trip down South for my wallet project. I won the prize!
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
      {/* Friends Reunite*/}
      <div className="bg-green-700 w-full h-[92vh] snap-center place-content-center flex flex-col items-center px-2 relative">
        <DateAndLocation date="Auguest 26th" location="Half Moon Bay, CA" />
        <Polaroid
          src="/adventures/summer23/bayHike.jpeg"
          caption="Friends Reunite"
        />
      </div>
      <hr className="" />
      {/* presentation */}
      <div className="bg-stone-900 w-full h-[92vh] snap-center place-content-center pt-[22vh] px-2 relative">
        <DateAndLocation date="August 27th" location="Berkeley, CA" />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
          <div className="md:w-1/2">
            <div className="max-w-lg mx-auto">
              <BluVideo
                videoSrc="https://vimeo.com/859249141?share=copy"
                isPlaying={false}
              />
            </div>
          </div>
          <div className="md:w-1/2 prose prose-invert md:prose-xl flex flex-col place-content-center max-w-xl">
            <p>
              I have been working on an open-source wallet for the past year.
              Not with grand plans of making a billion bucks, but with grand
              plans of bringing something useful into existence. So on one
              spring day in 2022,{" "}
              <a
                href="https://www.kryptik.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:cursor-pointer text-sky-500"
              >
                Kryptik
              </a>{" "}
              was born.
            </p>
            <p>
              Just over a year later, we were invited to the Berkeley demo day:
              the culmination of a months long program.
            </p>
            <p>
              I was coding until the very end and scrambled into my dress
              clothes t-minus-two minutes away from walking on stage.
            </p>
          </div>
        </div>
      </div>
      <hr className="" />
    </div>
  );
}

function DateAndLocation(props: { date: string; location: string }) {
  return (
    <div className="absolute top-8 left-3 bluFont flex flex-col space-y-3 backdrop-blur-xl">
      <div className="bg-gray-500/20 rounded-sm px-2 text-gray-300 w-fit">
        <p className="text-2xl">{props.date}</p>
      </div>
      <div className="bg-gray-500/20 rounded-sm px-2 text-gray-300">
        <p className="text-3xl">{props.location}</p>
      </div>
    </div>
  );
}

function Polaroid(props: { src: string; caption: string }) {
  return (
    <div className="max-w-2xl bg-white p-2 rounded-md w-fit mx-auto">
      <ImageWithBlur
        src={props.src}
        width={400}
        height={400}
        alt={props.caption}
        className="w-96 h-96 object-cover rounded-md"
      />
      <p className="bluFont italic text-black text-4xl text-center mt-6 max-w-2xl px-2">
        {props.caption}
      </p>
    </div>
  );
}
