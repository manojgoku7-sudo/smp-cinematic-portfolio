# Project Collection Card Switch — QA Notes

The source of the perceived delay was the deferred wrapper `z-index` return, which could keep the previously active overlapping card above the next target. All four collection wrappers now report a `z-index` transition duration and delay of `0s`, so stack ownership transfers immediately. Card-level lift, halo, inner shimmer, and ambient movement remain independently smooth.
