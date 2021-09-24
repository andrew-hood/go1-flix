import { useQuery } from "@apollo/client";
import { Spinner, View } from "@go1d/go1d";
import { TOP_TOPICS } from "../queries/discover";
import Carousel from "./Carousel";

function Discover() {
  const { loading, error, data } = useQuery(TOP_TOPICS);

  return !loading && data ? (
    <View backgroundColor="background" padding={5} overflow="hidden">
      { data.discover.blocks.map((block: any) => (
        <Carousel
          key={block.id}
          title={block.title}
          cards={block.response.edges}
        />
      ))}
    </View>
  ) : (
    <View alignItems="center" justifyContent="center" backgroundColor="background" height="100%">
      <Spinner size={10} color="contrast" />
    </View>
  )
}
export default Discover;