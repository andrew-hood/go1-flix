import { gql } from "@apollo/client";

export const TOP_TOPICS = gql`
  query Search {
    discover(blocks: { type: LearningCarousel, data: TOP_TOPICS, names: ["T1", "T2", "T3", "T4", "T5"] }) {
      id,
      blocks {
        ... on LearningCarousel {
          id,
          title,
          response(first: 15, after: "") {
            pageInfo {
              totalCount
            }
            edges {
              node {
                ... on CourseCard {
                  id,
                  type,
                  title,
                  image,
                  duration
                }
              }
            }
          }
        }
      }
    }
  }
`;