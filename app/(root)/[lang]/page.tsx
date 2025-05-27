import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { getDictionary } from "./dictionaries";


export default async function Home({ searchParams, params }: { searchParams: Promise<{ query?: string }>; params: Promise<{ lang: 'en-US' | 'ja-JP' }> }) {
  const query = (await searchParams).query;
  const fetchParams = { search: query || null }
  const session = await auth();
  const { lang } = await params;
  const dict = await getDictionary(lang);


  console.log("session", session?.id);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params: fetchParams });

  return (
    <div>
      <section className="pink_container pattern">

        <h1 className="heading">{dict.submitIdeas} <br /> 起業家とつながる</h1>

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
