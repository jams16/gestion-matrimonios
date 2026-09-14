import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';

class AppTableColumn {
  const AppTableColumn({
    required this.label,
    this.alignment = Alignment.centerLeft,
  });

  final String label;
  final Alignment alignment;
}

class AppTable extends StatelessWidget {
  const AppTable({
    super.key,
    required this.columns,
    required this.rows,
  });

  final List<AppTableColumn> columns;
  final List<List<String>> rows;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        headingRowColor: WidgetStatePropertyAll(
          Theme.of(context)
              .colorScheme
              .surfaceContainerHighest,
        ),
        border: TableBorder.all(
          color: AppColors.border,
        ),
        columns: columns
            .map(
              (column) => DataColumn(
                label: Align(
                  alignment: column.alignment,
                  child: Text(
                    column.label,
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            )
            .toList(),
        rows: rows
            .map(
              (row) => DataRow(
                cells: List.generate(
                  columns.length,
                  (index) => DataCell(
                    Align(
                      alignment:
                          columns[index].alignment,
                      child: Text(
                        index < row.length
                            ? row[index]
                            : '',
                      ),
                    ),
                  ),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}