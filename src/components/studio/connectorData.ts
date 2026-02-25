import type { ConnectorMeta } from './types';

// Raw markdown imports from README files
import anthropicClaudeReadme from './readmes/anthropic-claude.md?raw';
import deepseekReadme from './readmes/deepseek.md?raw';
import fireworksAiReadme from './readmes/fireworks-ai.md?raw';
import googleGeminiReadme from './readmes/google-gemini.md?raw';
import groqReadme from './readmes/groq.md?raw';
import mistralReadme from './readmes/mistral.md?raw';
import ollamaReadme from './readmes/ollama.md?raw';
import openaiChatReadme from './readmes/openai-chat.md?raw';
import openaiCompatibleReadme from './readmes/openai-compatible.md?raw';
import perplexityReadme from './readmes/perplexity.md?raw';
import togetherAiReadme from './readmes/together-ai.md?raw';
import xaiGrokReadme from './readmes/xai-grok.md?raw';
import azureOpenaiReadme from './readmes/azure-openai.md?raw';
import sendgridReadme from './readmes/sendgrid.md?raw';
import slackReadme from './readmes/slack.md?raw';
import genericRestReadme from './readmes/generic-rest.md?raw';
import webhookReadme from './readmes/webhook.md?raw';

export const connectors: ConnectorMeta[] = [
  // --- AI ---
  {
    id: 'connector:anthropic-claude',
    label: 'Anthropic Claude',
    category: 'ai',
    icon: '/connectors/anthropic-claude.svg',
    cardCopy: 'Claude in your process — apply the template, set your key, deploy.',
    readme: {
      title: 'Anthropic Claude',
      markdown: anthropicClaudeReadme,
    },
  },
  {
    id: 'connector:deepseek',
    label: 'DeepSeek',
    category: 'ai',
    icon: '/connectors/deepseek.svg',
    cardCopy: 'High-performance AI at breakthrough pricing — 10-50x cheaper than OpenAI.',
    readme: {
      title: 'DeepSeek',
      markdown: deepseekReadme,
    },
  },
  {
    id: 'connector:fireworks-ai',
    label: 'Fireworks AI',
    category: 'ai',
    icon: '/connectors/fireworks-ai.svg',
    cardCopy: 'FireAttention engine — 50% faster speed, 250% higher throughput.',
    readme: {
      title: 'Fireworks AI',
      markdown: fireworksAiReadme,
    },
  },
  {
    id: 'connector:google-gemini',
    label: 'Google Gemini',
    category: 'ai',
    icon: '/connectors/google-gemini.svg',
    cardCopy: 'Google Gemini via OpenAI-compatible endpoint — easy provider swapping.',
    readme: {
      title: 'Google Gemini',
      markdown: googleGeminiReadme,
    },
  },
  {
    id: 'connector:groq',
    label: 'Groq',
    category: 'ai',
    icon: '/connectors/groq.svg',
    cardCopy: 'Ultra-fast LPU inference — 500+ tokens/second on large models.',
    readme: {
      title: 'Groq',
      markdown: groqReadme,
    },
  },
  {
    id: 'connector:mistral',
    label: 'Mistral AI',
    category: 'ai',
    icon: '/connectors/mistral.svg',
    cardCopy: 'European AI — EU data sovereignty, strong multilingual support.',
    readme: {
      title: 'Mistral AI',
      markdown: mistralReadme,
    },
  },
  {
    id: 'connector:ollama',
    label: 'Ollama',
    category: 'ai',
    icon: '/connectors/ollama.svg',
    cardCopy: 'Run AI locally — zero API keys, zero cost, fully air-gapped.',
    readme: {
      title: 'Ollama',
      markdown: ollamaReadme,
    },
  },
  {
    id: 'connector:openai-chat',
    label: 'OpenAI Chat',
    category: 'ai',
    icon: '/connectors/openai.svg',
    cardCopy: 'GPT in your process — same workflow, one element template.',
    readme: {
      title: 'OpenAI Chat',
      markdown: openaiChatReadme,
    },
  },
  {
    id: 'connector:openai-compatible',
    label: 'OpenAI-Compatible',
    category: 'ai',
    icon: '/connectors/openai.svg',
    cardCopy: 'Universal fallback — connect to any OpenAI-compatible endpoint.',
    readme: {
      title: 'OpenAI-Compatible',
      markdown: openaiCompatibleReadme,
    },
  },
  {
    id: 'connector:perplexity',
    label: 'Perplexity',
    category: 'ai',
    icon: '/connectors/perplexity.svg',
    cardCopy: 'AI with built-in web search — answers grounded in real-time information.',
    readme: {
      title: 'Perplexity',
      markdown: perplexityReadme,
    },
  },
  {
    id: 'connector:together-ai',
    label: 'Together AI',
    category: 'ai',
    icon: '/connectors/together-ai.svg',
    cardCopy: '200+ open-source models on US-hosted infrastructure.',
    readme: {
      title: 'Together AI',
      markdown: togetherAiReadme,
    },
  },
  {
    id: 'connector:xai-grok',
    label: 'xAI Grok',
    category: 'ai',
    icon: '/connectors/xai-grok.svg',
    cardCopy: 'Grok in your process — OpenAI-compatible, drop-in ready.',
    readme: {
      title: 'xAI Grok',
      markdown: xaiGrokReadme,
    },
  },
  {
    id: 'connector:azure-openai',
    label: 'Azure OpenAI',
    category: 'ai',
    icon: '/connectors/azure-openai.svg',
    cardCopy: 'GPT in your Azure subscription — your data, your network, your billing.',
    readme: {
      title: 'Azure OpenAI',
      markdown: azureOpenaiReadme,
    },
  },
  // --- Communication ---
  {
    id: 'connector:sendgrid',
    label: 'SendGrid',
    category: 'communication',
    icon: '/connectors/sendgrid.svg',
    cardCopy: 'Transactional emails from your process — plain text, HTML, multi-recipient.',
    readme: {
      title: 'SendGrid',
      markdown: sendgridReadme,
    },
  },
  {
    id: 'connector:slack',
    label: 'Slack',
    category: 'communication',
    icon: '/connectors/slack.svg',
    cardCopy: 'Slack notifications from your process — plain text or rich Block Kit.',
    readme: {
      title: 'Slack',
      markdown: slackReadme,
    },
  },
  // --- General ---
  {
    id: 'connector:generic-rest',
    label: 'Generic REST',
    category: 'general',
    icon: '/connectors/generic-rest.svg',
    cardCopy: 'Connect to any REST API — configure URL, method, auth, and payload yourself.',
    readme: {
      title: 'Generic REST',
      markdown: genericRestReadme,
    },
  },
  {
    id: 'connector:webhook',
    label: 'Webhook',
    category: 'general',
    icon: '/connectors/webhook.svg',
    cardCopy: 'Fire-and-forget JSON POST — notify systems, trigger pipelines, push events.',
    readme: {
      title: 'Webhook',
      markdown: webhookReadme,
    },
  },
];

export const connectorsByCategory = {
  ai: connectors.filter(c => c.category === 'ai'),
  communication: connectors.filter(c => c.category === 'communication'),
  general: connectors.filter(c => c.category === 'general'),
};

export function getConnector(id: string): ConnectorMeta | undefined {
  return connectors.find(c => c.id === id);
}
