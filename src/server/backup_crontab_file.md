Run this command to edit crontab jobs:

`crontab -e`

To list them, run:

`crontab -l`

Run every day at 23:30
`30 23 * * * rsync -a ~/db_* ~/backup_$(date +%s)/`

Run everytime
`@reboot rsync -a ~/db_* ~/backup_$(date +%s)/`