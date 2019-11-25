for f in ../installations/*.sh; do
  bash "$f" -H || break
done