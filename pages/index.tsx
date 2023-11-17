import { getSession } from "next-auth/react"
import { NextPageContext } from "next"

import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import useFavorites from "@/hooks/useFavorites"
import useMoviesList from "@/hooks/useMoviesList"
import InfoModal from "@/components/InfoModal"
import useInfoModalStore from "@/hooks/useInfoModal"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMoviesList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
      <MovieList title="Trending Now" data={movies} />
      <MovieList title="My Lists" data={favorites} />
      </div>
    </>
  )
}
