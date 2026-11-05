#!/usr/bin/env python3
"""Set canonical/hreflang/absolute social image URLs after a public domain is known.
Run: python tools/configure_domain.py https://www.your-real-domain.com/
For GitHub Pages project URLs, include the repo path: https://user.github.io/repo/
"""
from pathlib import Path
from urllib.parse import urljoin,urlparse
import json,re,sys,html

base=Path(__file__).resolve().parent.parent
if len(sys.argv)!=2 or not sys.argv[1].startswith('https://'):
    raise SystemExit('Usage: python tools/configure_domain.py https://your-real-domain.com/')
root_url=sys.argv[1].rstrip('/')+'/'
parsed=urlparse(root_url)
if not parsed.netloc or '<' in root_url or ' ' in root_url:raise SystemExit('Please provide a valid public HTTPS URL')
url_en=root_url;url_es=urljoin(root_url,'es/');og=urljoin(root_url,'assets/og-wonderland-sweets.jpg')
def rewrite_jsonld(match,url,site_url,og_image):
    data=json.loads(match.group(2))
    business=data['@graph'][0]
    business['@id']=urljoin(site_url,'#wonderland-business')
    business['url']=site_url
    business['image']=og_image
    business['logo']=urljoin(site_url,'assets/wonderland-logo.jpg')
    page=data['@graph'][1]
    page['@id']=url+'#page'; page['url']=url;page['about']={'@id':business['@id']}
    data['@graph'][2]['@id']=url+'#faq'
    return match.group(1)+json.dumps(data,ensure_ascii=False).replace('</','<\\/')+match.group(3)
for language,url,p in [('en',url_en,base/'index.html'),('es',url_es,base/'es'/'index.html')]:
    content=p.read_text(encoding='utf-8')
    content=re.sub(r'\s*<link rel="canonical"[^>]*>', '',content)
    content=re.sub(r'\s*<link rel="alternate" hreflang="(?:en|es|x-default)"[^>]*>', '',content)
    newtags='\n  <link rel="canonical" href="'+html.escape(url,quote=True)+'">\n  <link rel="alternate" hreflang="en" href="'+html.escape(url_en,quote=True)+'">\n  <link rel="alternate" hreflang="es" href="'+html.escape(url_es,quote=True)+'">\n  <link rel="alternate" hreflang="x-default" href="'+html.escape(url_en,quote=True)+'">'
    content=content.replace('</title>', '</title>'+newtags,1) if '</title>' in content else content.replace('</head>',newtags+'\n</head>',1)
    content=re.sub(r'(<meta property="og:image" content=")[^"]+',lambda m:m.group(1)+og,content)
    content=re.sub(r'(<meta name="twitter:image" content=")[^"]+',lambda m:m.group(1)+og,content)
    content=re.sub(r'\s*<meta property="og:url"[^>]*>', '',content)
    content=content.replace('</head>',f'  <meta property="og:url" content="{html.escape(url,quote=True)}">\n</head>',1)
    content=re.sub(r'(<script id="structured-data" type="application/ld\+json">)(.*?)(</script>)',lambda m:rewrite_jsonld(m, url,root_url,og),content,count=1,flags=re.DOTALL)
    p.write_text(content,encoding='utf-8')

(base/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{html.escape(x)}</loc></url>\n' for x in [url_en,url_es])+'</urlset>\n',encoding='utf-8')
(base/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+urljoin(root_url,'sitemap.xml')+'\n',encoding='utf-8')
print('Configured canonical, hreflang, og:image, JSON-LD, robots.txt and sitemap.xml for',root_url)
