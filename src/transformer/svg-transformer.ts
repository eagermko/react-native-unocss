import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader';
const collections = [
  'academicons',
  'akar-icons',
  'ant-design',
  'arcticons',
  'basil',
  'bi',
  'bpmn',
  'brandico',
  'bx',
  'bxl',
  'bxs',
  'bytesize',
  'carbon',
  'charm',
  'ci',
  'cib',
  'cif',
  'cil',
  'circle-flags',
  'circum',
  'clarity',
  'codicon',
  'cryptocurrency-color',
  'cryptocurrency',
  'dashicons',
  'ei',
  'el',
  'emblemicons',
  'emojione-monotone',
  'emojione-v1',
  'emojione',
  'entypo-social',
  'entypo',
  'eos-icons',
  'ep',
  'et',
  'eva',
  'fa-brands',
  'fa-regular',
  'fa-solid',
  'fa',
  'fa6-brands',
  'fa6-regular',
  'fa6-solid',
  'fad',
  'fe',
  'feather',
  'file-icons',
  'flag',
  'flagpack',
  'flat-color-icons',
  'flat-ui',
  'fluent-emoji-flat',
  'fluent-emoji-high-contrast',
  'fluent-emoji',
  'fluent-mdl2',
  'fluent',
  'fontelico',
  'fontisto',
  'foundation',
  'fxemoji',
  'gala',
  'game-icons',
  'geo',
  'gg',
  'gis',
  'gridicons',
  'grommet-icons',
  'healthicons',
  'heroicons-outline',
  'heroicons-solid',
  'heroicons',
  'humbleicons',
  'ic',
  'icomoon-free',
  'icon-park-outline',
  'icon-park-solid',
  'icon-park-twotone',
  'icon-park',
  'iconoir',
  'icons8',
  'il',
  'ion',
  'iwwa',
  'jam',
  'la',
  'line-md',
  'logos',
  'ls',
  'lucide',
  'majesticons',
  'maki',
  'map',
  'material-symbols',
  'mdi-light',
  'mdi',
  'medical-icon',
  'memory',
  'mi',
  'mingcute',
  'mono-icons',
  'nimbus',
  'nonicons',
  'noto-v1',
  'noto',
  'octicon',
  'oi',
  'ooui',
  'openmoji',
  'pajamas',
  'pepicons-pop',
  'pepicons-print',
  'pepicons',
  'ph',
  'pixelarticons',
  'prime',
  'ps',
  'quill',
  'radix-icons',
  'raphael',
  'ri',
  'si-glyph',
  'simple-icons',
  'simple-line-icons',
  'skill-icons',
  'subway',
  'svg-spinners',
  'system-uicons',
  'tabler',
  'teenyicons',
  'topcoat',
  'twemoji',
  'typcn',
  'uil',
  'uim',
  'uis',
  'uit',
  'uiw',
  'vaadin',
  'vs',
  'vscode-icons',
  'websymbol',
  'whh',
  'wi',
  'wpf',
  'zmdi',
  'zondicons',
];

export default async function svgTransformer(source: string) {
  const tokens: string[] = [];

  source.replace(/icon=["'](.*?)["']/g, (matched, group) => {
    tokens.push(group);
    return matched;
  });
  if (!tokens.length) return source;

  const parsedToken = tokens.map((token) => {
    // i-[icon set]-[...icon names]
    const [collection, ...rest] = token.split('-');
    if (!collections.includes(collection)) return null;
    return [collection.trim(), rest.join('-').trim()];
  });

  const xmlStrings = await Promise.all(
    parsedToken.map(async (v) => {
      if (!v) return undefined;

      const [collection, icon] = v;
      return loadNodeIcon(collection, icon);
    })
  );

  return source.replace(/icon=["'](.*?)["']/g, (matched, group) => {
    const xmlString = xmlStrings.shift();
    if (!xmlString) return matched;

    return `icon='${xmlString}'`;
  });
}
