// replicator.script
//tprint('[STARTED] @ ' + getHostname());
print('checking programs');
var programs = ["brutessh.exe",
    "ftpcrack.exe",
    "relaysmtp.exe",
    "httpworm.exe",
    "sqlinject.exe",
    "nuke.exe"
];
var progs = 0;
for (var j = 0; j < programs.length; j++) {
    var prog = programs[j];
    if (fileExists(prog, "home")) {
        progs++;
        print(progs + ' found');
    }
}
var servers2 = [getHostname()];
var scanner = scan(getHostname());
var servers = servers2.concat(scanner);
print(servers);

for (var i = 0; i < servers.length; i++) {
    var serv = servers[i];
    switch (serv) {
        case "home":
            break;
        case getHostname():
            break;
        default:
            if (serverExists(serv)) {
                scp("replicator.script", serv);
                scp("hackngrow.script", serv);
                if (!hasRootAccess(serv)) {
                    if (getServerRequiredHackingLevel(serv) > getHackingLevel()) {
                        tprint('server hacking level too high @ '+serv+': ' + getServerRequiredHackingLevel(serv));
                    } else {
                        print('hacking ' + serv);
                        var ports = getServerNumPortsRequired(serv);
                        if (!fileExists(programs[5], "home")) {
                            print('missing NUKE.exe program');
                        } else if (ports + 1 > progs) {
                            print('not enough programs waiting until you have enough programs');
                            for (; progs < ports + 1;) {
                                var progs = 0;
                                for (var j = 0; j < programs.length; j++) {
                                    var prog = programs[j];
                                    if (fileExists(prog, "home")) {
                                        progs++;
                                        print(progs + ' found need ' + ports + 1);
                                    }
                                }
                            }
                        } else {
                            for (var j = 0; j < ports; j++) {
                                if (fileExists(programs[0], "home")) { brutessh(serv); j++; if (j >= ports) {break;} }
                                if (fileExists(programs[1], "home")) { ftpcrack(serv); j++; if (j >= ports) {break;} }
                                if (fileExists(programs[2], "home")) { relaysmtp(serv); j++; if (j >= ports) {break;} }
                                if (fileExists(programs[3], "home")) { httpworm(serv); j++; if (j >= ports) {break;} }
                                if (fileExists(programs[4], "home")) { sqlinject(serv); j++; if (j >= ports) {break;} }
                            }
                            nuke(serv);
                        }
                    }
                    print(serv + ' rooted');
                }
                killall(serv);
                print('waiting 10s for killing scripts');
                sleep(10000);
                exec("replicator.script", serv, 1, 0);
            }
            break;
    }
}
switch (getHostname()) {
    case "home":
        break;
    default:
        spawn("hackngrow.script", (Math.floor(getServerRam(getHostname())[0] / 2.45)), 0);
        exec("hackngrow.script", getHostname(), (Math.floor(getServerRam(getHostname())[1] / 2.45)), 1);
        print('waiting 5s for script start');
        sleep(5000);
        break;
}
