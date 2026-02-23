import type { ConnectorMeta } from './types';

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
      description: 'Call Anthropic\'s Claude models directly from a BPMN service task. Apply the element template, set your API key, and point it at your process variables — Claude responds inline and the result lands back in your process as a variable.\n\nSupports all Claude models including Haiku (fast, cheap), Sonnet (balanced), and Opus (most capable). System prompts, max tokens, and temperature are fully configurable in the request payload.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Anthropic API key — get one at console.anthropic.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call DeepSeek\'s models from a BPMN service task. High-performance AI at breakthrough pricing — often 10-50x cheaper than OpenAI for equivalent quality.\n\nSupports DeepSeek-V3 (chat) and DeepSeek-R1 (reasoning). Exceptional at coding and mathematics with 128K context window. R1 is fully open-source.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.\n\nNote: DeepSeek\'s API is hosted in China. For data residency concerns, run DeepSeek-R1 via Ollama (local), Groq, or Together AI (US-hosted).',
      credentials: 'DeepSeek API key — get one at platform.deepseek.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call AI models via Fireworks AI\'s high-performance inference platform from a BPMN service task. Proprietary FireAttention engine delivers up to 50% faster speed and 250% higher throughput than standard GPU serving.\n\nHosts popular open-source models including Llama 3.3 70B, Mixtral 8x22B, and DeepSeek R1. Enterprise SLAs, fine-tuning, and batch processing built in.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Fireworks AI API key — get one at fireworks.ai',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call Google\'s Gemini models from a BPMN service task via the OpenAI-compatible endpoint. Same request/response format as OpenAI — easy to swap between providers.\n\nSupports Gemini 2.5 Flash (fast), Gemini 2.5 Pro (complex reasoning), and Gemini 2.0 Flash Lite (lowest cost). Generous free tier and up to 1M token context on some models.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Gemini API key — get one at aistudio.google.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call AI models via Groq\'s ultra-fast LPU inference from a BPMN service task. Custom Language Processing Unit chips deliver 500+ tokens/second — often 10-20x faster than GPU-based alternatives.\n\nRuns open-source models including Llama 3.3 70B, Gemma 2 9B, DeepSeek R1, and Qwen 3 32B. Generous free tier with thousands of requests per day.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Groq API key — get one at console.groq.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call Mistral AI\'s models from a BPMN service task. European AI with strong multilingual support and EU data sovereignty — headquartered in Paris, data processed under EU jurisdiction.\n\nSupports Mistral Small (efficient), Mistral Medium, Mistral Large (most capable), Mistral Nemo (open-weight), and Codestral (code specialist).\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Mistral API key — get one at console.mistral.ai',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Run AI models locally with Ollama from a BPMN service task — zero API keys, zero cost, fully air-gapped. Every token processed on your own hardware with no internet required.\n\nRuns Llama 3.2, Mistral, Phi, Gemma, DeepSeek Coder, and hundreds more. Exposes an OpenAI-compatible API, making it a drop-in replacement for cloud providers.\n\nNo API key needed for local use. Ollama runs as a Docker container alongside your Camunda engine.',
      credentials: 'No API key needed — runs locally',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call OpenAI\'s GPT models from a BPMN service task. Apply the element template, set your API key, edit the payload to reference your process variables, and deploy. The AI response maps back into process variables automatically.\n\nSupports gpt-4o-mini (fast and cheap), gpt-4o (most capable), and gpt-3.5-turbo. Temperature, max tokens, and system prompts are all editable in the request payload.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'OpenAI API key — get one at platform.openai.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Connect to any OpenAI-compatible API endpoint — the universal fallback connector. If your provider isn\'t listed as a dedicated connector, use this one.\n\nWorks with vLLM, LM Studio, LiteLLM, OpenRouter, and any other endpoint that speaks the OpenAI chat completions format. Edit the URL, model name, and auth settings to match your provider.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Depends on provider — see provider documentation',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call Perplexity\'s Sonar models from a BPMN service task — AI with built-in web search that grounds answers in real-time information and cites sources.\n\nSupports Sonar (default with search), Sonar Pro (larger), and Sonar Reasoning (chain-of-thought + search). Ideal for market research, competitive analysis, news monitoring, and fact-checking.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Perplexity API key — get one at perplexity.ai/settings/api',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Access 200+ open-source models through Together AI\'s inference platform from a BPMN service task. OpenAI-compatible API with fast inference, fine-tuning, and competitive pricing.\n\nHosts Llama 3.3 70B, DeepSeek R1, Qwen 2.5 72B, Mixtral 8x22B, and many more. US-hosted infrastructure for data residency requirements.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Together AI API key — get one at api.together.ai',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call xAI\'s Grok models from a BPMN service task. Same workflow as the other AI connectors — apply the template, set your key, configure the payload, and deploy. Grok uses the same API format as OpenAI, so switching between providers is trivial.\n\nSupports grok-3-mini-fast (cheapest), grok-3-mini, grok-3, and grok-4 (most powerful). Full control over temperature, max tokens, and system prompts.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'xAI API key — get one at console.x.ai',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Call Azure-hosted OpenAI models from a BPMN service task. Same GPT models as the OpenAI connector, but hosted in your own Azure subscription — behind your firewalls, under your data residency policies, and billed through your existing Microsoft agreement.\n\nSupports any model deployed in Azure AI Foundry (GPT-4o, GPT-4, GPT-4o-mini, etc.). The model is determined by your Azure deployment, not the request payload.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Azure OpenAI API key — get one from Azure Portal → Keys and Endpoint',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Send transactional emails from your Camunda 7 processes via the SendGrid v3 Mail Send API. Supports plain text and HTML emails with variable substitution from process data.\n\nFree tier includes 100 emails/day — enough for most process automation. Supports multiple recipients, HTML templates, and attachment workflows.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'SendGrid API key — get one at sendgrid.com',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Send messages to Slack channels or users directly from your Camunda 7 processes. Uses the Slack Web API chat.postMessage endpoint with support for plain text and rich Block Kit formatting.\n\nIdeal for AI result notifications, approval alerts, error alerting, status updates, and escalation workflows. The first non-AI connector — the one that completes real workflows.\n\nBot tokens are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Slack Bot Token (xoxb-...) — create a Slack App at api.slack.com/apps',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Connect to any REST API — configure URL, method, auth, and payload yourself. The universal connector for when there\'s no dedicated template. Every field is visible and editable: endpoint URL, HTTP method, authentication type, headers, request payload, and response mapping.\n\nSupports all auth types (Bearer, API key header, Basic Auth, query param, none) and all HTTP methods (GET, POST, PUT, DELETE, PATCH). Extra headers and query parameters are fully configurable.\n\nAPI keys are resolved through Catalyst\'s secret system — environment variables, Docker secrets, properties files, or process variables for quick dev testing.',
      credentials: 'Depends on your target API — configure auth type, header, and credential in the template',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
      description: 'Send a JSON POST to any webhook URL — notify external systems, trigger pipelines, fire events. The fire-and-forget outbound connector for pushing events out of your process.\n\nDefaults to no auth. If the receiver expects a shared secret, configure an API key header. Timeout is 10 seconds — webhooks should respond fast.\n\nFor full request/response control (GET, PUT, DELETE, custom response mapping), use the Generic REST connector instead.',
      credentials: 'Usually none — configure a shared secret if the receiver requires one',
      links: [{ label: 'Open Example BPMN', path: '#' }],
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
