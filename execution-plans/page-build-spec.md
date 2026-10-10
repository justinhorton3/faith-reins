# Page Build Specification Contract

Every page plan is executable only when its page-specific content is combined with this contract and `wix-implementation-spec.md`. A human developer must not invent geometry or behavior.

## Required page values

Before opening Wix, the page plan must provide:

1. Page name and exact slug.
2. V4 screen headline, body, primary action, and secondary action.
3. Desktop and mobile hero filenames.
4. Ordered sections, each with a heading, body/content source, component type, and CTA destination.
5. Exact component layout: column count by breakpoint, max width, alignment, gap, and section padding.
6. Exact text roles: use the type scale in `wix-implementation-spec.md` and state any exception.
7. Exact interaction: page link, anchor, Wix Form, Wix Stores section, or donation provider.
8. A page-specific pass/fail condition.

## Standard page assembly

Unless the v4 screen explicitly differs, build pages in this order:

1. Global header (92/72 px).
2. Hero (560/440 px minimum) with one H1, body, and one primary CTA.
3. Page content sections using 1200 px container, global section padding, and the specified card/grid rules.
4. Final CTA band with one primary and one secondary action.
5. Global footer.

## Wix element settings

- Use Wix containers/stacks with fixed max widths and responsive docking.
- Use the named type roles; never accept Wix default theme sizing.
- Set all buttons to the shared 48 px height and 44 px minimum touch target.
- Set image fitting to Cover and choose the focal point at each breakpoint.
- Set accessibility labels on menu controls, forms, and meaningful images.
- Set links through the canonical route map; never paste an unapproved URL.

## Completion evidence

The plan is not implementation-ready until the developer can record the actual Wix element settings, screenshot comparisons at the required widths, and link/form results in `execution-log.md`.
