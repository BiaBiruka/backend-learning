# Stock table: a normalization dilemma

## The problem

After creating the games table on DB, it was proposed to add a way to control the stock of each game. That could be done either via adding a "stock" column on the games table or creating a separate table for that.
It was recommended to search for data normalization and the pros and cons of each approach.

## Adding a new column

This option (which is the denormalization one) consists in just adding a "stock" column on my already-existing games table. This way, my table would look like this:

| ID  | Name   | Price  | Stock |
| --- | ------ | ------ | ----- |
| 1   | Game 1 | 100.00 | 10    |
| 2   | Game 2 | 50.00  | 10    |
| 3   | Game 3 | 100.00 | 10    |

Denormalization tends to be more used when data is not frequently edited, which is not true for this scenario as stock is always changing (selling, returning, reestocking)

- **Pros:** No need to add complex JOINs statements when doing a SELECT on DB
- **Cons:** For larger tables, it is an extra weight. Also, if I want to add more stock informations at some point, the table will be even bigger.

## Creating a new table

This option (the normalization one) consists in creating a new, separate table for all stock information, using a FOREIGN KEY to reference the games table. This way, my DB would look like this:

<div style="display: flex; gap: 1rem"> 
<div> 
<h5> Games table </h5>

| ID  | Name   | Price  |
| --- | ------ | ------ |
| 1   | Game 1 | 100.00 |
| 2   | Game 2 | 50.00  |
| 3   | Game 3 | 100.00 |

</div>

<div> 
<h5> Stock table </h5>

| Game_ID | Stock |
| ------- | ----- |
| 1       | 10    |
| 2       | 10    |
| 3       | 10    |

</div> 
</div>

Normalization is usually used when an entity has multiple relationships, but that is not completely true for this scenario.

- **Pros:** More flexible for future changes
- **Cons:** SELECT operaions will be way more complex, as JOINs will be needed sometimes.

## Conclusion

After putting a lot of thought into just adding a new column for the simplicity of the project, I started to think about what it would look like on the real world. A stock control is not just a simple number, but also many other informations like the reorder point\*, if reestock was already ordered, and maybe even stock for different franchises by referencing another FOREIGN KEY.
Taking these ideas into consideration, as well as the pros and cons of each option, It was decided to create another table with the stock quantity, game ID, reorder point etc. This way I can deal with stock operations without affecting the game itself, as well as being more flexibible for possible changes in stock control in the future, such as adding franchises.

<p style='font-size: 13px; opacity: 0.7'> <strong> * Reorder point: </strong>  A numeric value that represents the value that my stock needs to reach in order to request more products, and yet not let my stock reach zero until the new ones arrive. 
<br />
If my product has a reorder point of 15, I know that once my stock reaches 15 I should order more of said product from my supplier.
</p>

## Extra notes

Under the possibility of actually adding franchises, I could either create a new stock table for each franchise or create something like this:

<div style="display: flex; gap: 1rem"> 
<div> 
<h5> Games table </h5>

| ID  | Name   | Price  |
| --- | ------ | ------ |
| 1   | Game 1 | 100.00 |
| 2   | Game 2 | 50.00  |
| 3   | Game 3 | 100.00 |

</div>

<div> 
<h5> Franchises table </h5>

| ID  | Name        | ... |
| --- | ----------- | --- |
| 1   | Franchise 1 |     |
| 2   | Franchise 2 |     |
| 3   | Franchise 3 |     |

</div>

<div> 
<h5> Stock table </h5>

| Game_ID | Franchise_ID | Stock | ... |
| ------- | ------------ | ----- | --- |
| 1       | 1            | 10    |     |
| 2       | 1            | 10    |     |
| 3       | 1            | 10    |     |
| 1       | 2            | 10    |     |
| ...     |

</div> 
</div>
