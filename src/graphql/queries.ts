/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      title
      lyrics
      columns
      columnWidths
      createdAt
      updatedAt
      username
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        lyrics
        columns
        columnWidths
        createdAt
        updatedAt
        username
      }
      nextToken
    }
  }
`;
