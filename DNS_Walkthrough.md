# DNS & CNAME Walkthrough

## What is a CNAME Record?
A CNAME (Canonical Name) record is essentially an alias in the Domain Name System (DNS). Instead of pointing a domain directly to an IP address (like an A record does), a CNAME points a domain or subdomain to another domain name. 

Think of it like a forwarding address. If someone sends mail to your old house, a forwarding address ensures it gets sent to your new house. 

## What Value Will My Record Hold?
Currently, my portfolio is hosted live at `shahzaib-developer-portfolio.vercel.app`. If I decide to map a custom domain to it (for example, `www.shahzaib.dev`), I would need to configure a CNAME record in my domain registrar's settings. 

The configuration would look like this:
- **Type:** CNAME
- **Name/Host:** `www`
- **Value/Target:** `cname.vercel-dns.com` (Vercel's standard routing address)

This tells the internet that anyone visiting `www.shahzaib.dev` should actually be routed to Vercel's servers to fetch my portfolio.

## The Full DNS Flow (Behind the Scenes)
Here is the step-by-step breakdown of exactly what happens when someone visits a website:

1. **Typing the URL:** A user types my website address into their browser and hits Enter. The browser needs an IP address to connect to, but it only has the human-readable domain name.
2. **The Resolver:** The browser first checks its local cache. If it doesn't have the IP address, it passes the request to the ISP's DNS Resolver (a server designed to track down records).
3. **The Nameserver Journey:** 
   - The Resolver asks the **Root Nameserver**, which doesn't know the exact IP but knows who manages the Top-Level Domain (TLD), like `.com` or `.dev`.
   - The Resolver then asks the **TLD Nameserver**, which directs it to the specific **Authoritative Nameserver** that holds my domain's actual records.
4. **The Record:** The Resolver finally asks the Authoritative Nameserver for the IP address. If it finds my CNAME record, it says, *"This is an alias! You actually need to look up `cname.vercel-dns.com`."* 
5. **The Response:** The Resolver quickly finds the IP address for Vercel's servers and sends it back to the user's browser. The browser then makes a direct connection to that IP address, and my portfolio successfully loads on the screen!
