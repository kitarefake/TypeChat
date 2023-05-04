import * as oai from '../src/openai';
import * as config from '../src/typechatConfig';
import {Embedding} from '../src/embeddings';
import {TestContext} from './testing';
import * as fs from 'fs';
import * as path from 'path';

const test_texts: string[] = [
    'the quick brown fox jumps over the lazy dog',
    'He was born with a gift of laughter and a sense that the world was mad',
    'Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small, unregarded yellow sun',
];

export async function runTestsAsync(context: TestContext): Promise<void> {
    const configPath = path.resolve('./tests/appConfig.json');
    if (!fs.existsSync(configPath)) {
        context.log('No Config Found. OpenAI tests will not run ');
        return;
    }

    const tcConfig: config.TypechatConfig = config.loadConfig(
        './tests/appConfig.json'
    );

    let client: oai.OpenAIClient = new oai.OpenAIClient(
        tcConfig.completionModel
    );
    await testCompletions(context, client);

    client = new oai.OpenAIClient(tcConfig.embeddingModel);
    await testEmbeddings(context, client);
}
runTestsAsync.TestName = 'OpenAI';

async function testCompletions(
    context: TestContext,
    client: oai.OpenAIClient): Promise<void> {
    const texts: string[] = test_texts;
    for (let i = 0; i < texts.length; ++i) {
        let result: string;
        if (client.modelSettings.isChat) {
            result = await client.getChatCompletion(texts[i], 256, 0.2);
        } else {
            result = await client.getCompletion(texts[i], 256, 0.2);
        }
        context.assertNotNullOrEmpty(result);
    }
}

async function testEmbeddings(
    context: TestContext,
    client: oai.OpenAIClient
): Promise<void> {
    const texts: string[] = test_texts;
    const embeddings: Embedding[] = await client.createEmbeddings(texts);
    context.assertTrue(embeddings.length === texts.length);
    const x: Embedding = embeddings[0];
    for (let i = 1; i < embeddings.length; ++i) {
        x.cosineSimilarity(embeddings[i]);
    }
}
