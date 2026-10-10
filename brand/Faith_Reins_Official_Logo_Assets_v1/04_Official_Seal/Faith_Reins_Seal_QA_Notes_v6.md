# Faith Reins Seal QA v6

## Problems fixed
1. The EB Garamond capital Q had a long decorative tail that did not match the locked reference.
   - Replaced seal serif with Noto Serif SemiBold.
   - Production SVG exports text to paths, so downstream users do not need the font installed.

2. Text was allowed too close to the gold border.
   - New invariant: no text glyph may touch or cross any gold line.
   - Hard maximum text radius: R=392.
   - Gold border centerline: R=414, 6 pt / 8.0px thick.
   - Current title clearance: 35.9px.
   - Current descriptor clearance: 41.9px.

3. Inner text circle was too large.
   - Reduced optical text/divider radius to R=336.0.

4. Divider arcs must visually line up with the center of the curved type.
   - Both side divider arcs now use the same R=336.0 optical centerline.

5. Reproducibility.
   - All geometry and acceptance constraints are defined in Faith_Reins_Seal_System_Spec_v6.json.
