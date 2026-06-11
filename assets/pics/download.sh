#!/bin/bash
# Run from assets/pics/ to download all images
echo "Downloading pulsar simulator images..."

curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dame_Jocelyn_Bell_Burnell_at_the_IAU_XXIX_General_Assembly_%28iauga15-d2-28%29.jpg/240px-Dame_Jocelyn_Bell_Burnell_at_the_IAU_XXIX_General_Assembly_%28iauga15-d2-28%29.jpg" -o bell_burnell.jpg
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/480px-Crab_Nebula.jpg" -o crab_nebula.jpg
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vela_Pulsar_jet.jpg/480px-Vela_Pulsar_jet.jpg" -o vela_pulsar.jpg
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Terzan_5_Globular_Cluster.jpg/480px-Terzan_5_Globular_Cluster.jpg" -o terzan5.jpg
curl -L "https://www.aei.mpg.de/person/23736/26370/photo.jpg" -o knispel.jpg
curl -L "https://www.aei.mpg.de/person/27310/43608/photo.jpg" -o clark.jpg
curl -L "https://www.aei.mpg.de/person/32844/2784/photo.jpg" -o nieder.jpg
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Artist%27s_impression_of_the_double_pulsar_system_PSR_J0737-3039.jpg/480px-Artist%27s_impression_of_the_double_pulsar_system_PSR_J0737-3039.jpg" -o double_pulsar.jpg
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Pulsar_planet_NASA.jpg/480px-Pulsar_planet_NASA.jpg" -o pulsar_planets.jpg

echo "Done."
