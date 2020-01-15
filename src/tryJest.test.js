import { gql } from 'apollo-boost';
import { prisma } from '../src/generated/prisma-client';
import { client } from './utils/getClient';

beforeAll(async () => {
  await prisma.deleteManyUsers()
})

describe('Tests the createPost Mutation', () => {
    it('should successfully create a post', async () => {
        const createPost = gql`
            mutation{
                post(url:"www.facebook.com"
                description:"Facebook"
              )
              {
                id
                createdAt
              }
            }
        `;
        const res = await client.mutate({
        mutation: createPost
        })
        const exists = await prisma.$exists.post({id : res.data.createPost.id});
        expect(exists).toBe(true);
    })

})
