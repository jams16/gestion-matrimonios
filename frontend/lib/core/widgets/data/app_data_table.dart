import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';

class AppDataTableColumn {
  const AppDataTableColumn({
    required this.label,
    this.numeric = false,
    this.onSort,
  });

  final String label;
  final bool numeric;
  final DataColumnSortCallback? onSort;
}

class AppDataTable extends StatelessWidget {
  const AppDataTable({
    super.key,
    required this.columns,
    required this.rows,
    this.sortColumnIndex,
    this.sortAscending = true,
  });

  final List<AppDataTableColumn> columns;
  final List<DataRow> rows;

  final int? sortColumnIndex;
  final bool sortAscending;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.border,
        ),
        borderRadius: BorderRadius.circular(12),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: DataTable(
            sortColumnIndex: sortColumnIndex,
            sortAscending: sortAscending,
            headingRowColor: WidgetStatePropertyAll(
              Theme.of(context)
                  .colorScheme
                  .surfaceContainerHighest,
            ),
            columns: columns
                .map(
                  (column) => DataColumn(
                    label: Text(
                      column.label,
                    ),
                    numeric: column.numeric,
                    onSort: column.onSort,
                  ),
                )
                .toList(),
            rows: rows,
          ),
        ),
      ),
    );
  }
}