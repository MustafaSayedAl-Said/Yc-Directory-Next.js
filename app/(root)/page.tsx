import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }>; }) {
  const query = (await searchParams).query;
  const params = { search: query || null }
  const session = await auth();

  console.log("session", session?.id);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // const {data : posts} = await sanityFetch({Startup})

  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id: 1, name: "Mustafa" },
  //   _id: 1,
  //   description: "This is a description",
  //   image: "https://www.designveloper.com/wp-content/uploads/2023/06/overview-1200x783.webp",
  //   category: "management",
  //   title: "AI planner",
  // }]
  return (
    <div>
      <section className="pink_container pattern">
        <h1 className="heading">スタートアップを売り込む, <br /> 起業家とつながる</h1>

        <p className="sub-heading !max-w-3xl">
          アイデアを提出し、ピッチに投票し、バーチャルコンテストで注目を集めましょう
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Discover Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (posts.map((post: StartupTypeCard) => (
            <StartupCard key={post?._id} post={post} />
          ))) : (
            <p className="no-results">スタートアップが見つかりません</p>
          )}
        </ul>

      </section>

      <SanityLive />
    </div>
  );
}
